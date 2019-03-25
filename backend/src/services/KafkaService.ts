import * as kafka from "kafka-node";
import { Request, Response, NextFunction } from "express";
import { Message, Consumer, KafkaClient } from "kafka-node";
import logger from "../util/logger";

export enum KAFKA_TOPICS {
  PRIVACY_SETTINGS = "streaming.te.privacysettings",
  SRL_WIDGET = "srlWidgetSettings",
  XAPI_SURVEY = "streaming.fe.facts.survey"
}

export interface KafkaSubscription {
  topic: string;
  subscribed: boolean;
  callbacks: any[];
}

export class KafkaService {
  KAFKA_HOST = process.env["KAFKA_1_HOST"];
  kafkaProducerClient: KafkaClient;
  subscriptions: { [key: string]: KafkaSubscription } = {};

  constructor() {
    this.kafkaProducerClient = new kafka.KafkaClient({
      kafkaHost: this.KAFKA_HOST
    });

    this.kafkaProducerClient.on("error", this.onKafkaClientError);

    for (let topic in KAFKA_TOPICS) {
      this.subscriptions[KAFKA_TOPICS[topic]] = {
        topic: KAFKA_TOPICS[topic],
        callbacks: [],
        subscribed: false
      };
    }
  }

  onKafkaClientError = (msg: any) => {
    logger.info("Connected to Kafka");
  };

  initialize() {}

  addConsumer = (topic: KAFKA_TOPICS, callback: any) => {
    logger.verbose(`Adding Kafka Topic: ${topic}`);
    this.subscriptions[topic].callbacks.push(callback);

    if (!this.subscriptions[topic].subscribed) {
      this.createConsumer(topic);
      this.subscriptions[topic].subscribed = true;
    }
  };

  createConsumer = (topic: string) => {
    const kafkaClient = new kafka.KafkaClient({ kafkaHost: this.KAFKA_HOST });

    const kafkaConsumer = new kafka.Consumer(kafkaClient, [{ topic }], {
      autoCommit: false
    });

    kafkaConsumer.on("error", this.onKafkaConsumerErrorMessage);
    kafkaConsumer.on("message", this.onKafkaMessage);
  };

  onKafkaMessage = async (message: Message) => {
    let jsonValue: any;
    try {
      if (message.value instanceof Buffer) {
        jsonValue = (<Buffer>message.value).toJSON();
      } else {
        jsonValue = JSON.parse(message.value);
      }
      logger.debug(
        "Received Kafka XAPI Survey Message JSON: ",
        jsonValue.class
      );
    } catch (e) {
      logger.error("Error parsing kafka message as JSON");
      return;
    }

    for (const callback of this.subscriptions[message.topic].callbacks) {
      try {
        await callback(jsonValue);
      } catch (e) {
        logger.error("Error storing kafka survey message", e);
      }
    }
  };

  onKafkaConsumerErrorMessage(message: any) {
    logger.error("Kafka Consumer Error: ", [JSON.stringify(message)]);
  }

  produceKafkaMessage(topic: string, message: any, res: Response) {
    const producer = new kafka.Producer(this.kafkaProducerClient);
    const produceRequests = [
      {
        topic: topic,
        messages: [
          JSON.stringify({
            message
          })
        ]
      }
    ];
    producer.send(produceRequests, (error, data) => {
      if (error) {
        logger.error("Kafka Production Error: ", error);

        return res.status(200).json({
          message: "Kafka Production Error"
        });
      } else {
        logger.error("Kafka Production Success: ", data);
        return res.status(200).json({
          message: "Kafka Production Success"
        });
      }
    });
  }
}
