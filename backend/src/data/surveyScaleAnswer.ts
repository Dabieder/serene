export const sample = {
  actor: {
    account: {
      homePage: "http://localhost",
      name: "user"
    },
    name: "user",
    objectType: "Agent"
  },
  context: {
    contextActivities: {
      parent: [
        {
          definition: {
            description: {
              "en-US": "This is a survey hosted at st3k101."
            },
            name: {
              en: "Test"
            },
            type: "http://id.tincanapi.com/activitytype/survey"
          },
          id: "<bla@blubl.net>:Test-fc9bca7314",
          objectType: "Activity"
        }
      ]
    },
    extensions: {
      "http://activitystrea.ms/schema/1.0/place": {
        definition: {
          description: {
            "en-US": "Represents a physical location."
          },
          name: {
            "en-US": "Place"
          },
          type: "http://activitystrea.ms/schema/1.0/place"
        },
        geojson: {
          features: [
            {
              geometry: {
                coordinates: [50.1167, 8.6833],
                type: "Point"
              },
              type: "Feature"
            }
          ],
          type: "FeatureCollection"
        },
        id: "http://vocab.org/placetime/geopoint/wgs84/X50.1167Y8.6833.html",
        objectType: "Place"
      }
    },
    language: "en",
    platform: "st3k101 via localhost"
  },
  id: "92ae6926-1a94-45d1-8bd4-4e15b61f9005",
  object: {
    definition: {
      description: {
        "en-US":
          "This is a particular scale of a survey, it usually contains multiple questions."
      },
      name: {
        de: "5. Anstrengung"
      },
      type: "http://fantasy.land/dimension"
    },
    id: "<bla@blubl.net>:lernstrategien_wild_schiefele--5_anstrengung",
    objectType: "Activity"
  },
  result: [
    {
      score: {
        max: 5,
        min: 0,
        raw: 3.4,
        scaled: 1
      }
    }
  ],
  timestamp: "2018-09-27T14:45:43.997006",
  verb: {
    display: {
      "en-US": "Indicates the DataSubject answered something."
    },
    id: "http://adlnet.gov/expapi/verbs/answered"
  }
};
