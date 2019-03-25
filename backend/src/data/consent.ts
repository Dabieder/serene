export const consent: any = {
  title: "Declaration of consent",
  id: "1",
  consented: true,
  introduction: [
    "Declaration of consent for Prof. Dr. Drachsler and the Educational Technologies research team consisting of George Ciordas-Hertel, Daniel Biedermann, and Jan Schneider from the German Leibniz Institute for Educational Research (DIPF.de) for the collection and processing of (personal) data within the ‘Educational Technologies’ seminar at the Goethe University Frankfurt am Main, Germany.",
    "You are invited in the context of the Educational Technology seminar to explore and experience a Technology-Enhanced Learning (TEL) environment. The TEL environment is our joined subject of research during the seminar. Together we want to explore the potentials of TEL but also discuss its limitations and further improvements."
  ],
  informationLetter: [
    "You are invited in the context of the Educational Technology seminar to explore and experience a Technology-Enhanced Learning (TEL) environment. The TEL environment is our joined subject of research during the seminar. Together we want to explore the potentials of TEL but also discuss its limitations and further improvements. "
  ],
  conditions: [
    "The TEL environment is not used for assessment purposes at any moment. Your participation in the TEL environment will not affect your final grade for the seminar. The final grade for the seminar will be solely based on the outcomes and achievements of your seminar project that needs to be delivered on 15.03.2019 via email. ",
    "The TEL environment has been developed with great care. The data will always stay within the boundaries of the Goethe University Frankfurt am Main and no third-party software will be used. Nevertheless, the TEL environment is still in beta-testing and we can not guarantee a flawless and error-free operation at any moment."
  ],
  dataTypeIntroduction: [
    "In the following section you can see a list of all the types of data that we would like to collect in order to perform Learning Analytics an do research.",
    "For each type of data, you will be able to separately enable or disable whether you want to allow the collection of the data",
    "If you alternatively want to allow the collection of all the data, you can press the button below"
  ],
  consentItems: [
    {
      name: "Virtual Learning Environment (Moodle)",
      description:
        "The Moodle virtual learning environment is an application where you as a student can access course materials, interact with other course members, and post messages as well as assignments. For all interactions data that will be collected we record the time of interaction.",
      id: "75cdee52-18eb-44f0-9196-dc5358a7f2d8",
      dataCollected: [
        "Forum post entires and replies",
        "Pages viewed",
        "Log in and log out time",
        "Access and submission of assignments",
        "Navigation data"
      ],
      purposes: [""],
      icon: "record_voice_over",
      consented: false
    },
    {
      name: "Self-Regulated Learning Dashboard (SEREne) ",
      id: "52e1b315-f5e1-4003-bb32-aeeaf0036580",
      description:
        "The self-regulated learning dashboard is an application where you can plan, monitor and reflect on your learning goals. The following data is collected in SEREne and send to TLA",
      dataCollected: [
        "Learning goals",
        "Time planning to reach the learning goals",
        "Reflections on the accomplishment of the learning goals",
        "Navigation data"
      ],
      purposes: [
        "Research of the usability of the dashboard",
        "Research of the effects of dashboard usage on the course performance"
      ],
      icon: "assessment",
      consented: false
    },
    {
      id: "571b3137-34bd-44a6-b8a5-fd51a097d46a",
      name: "Survey System (xAPI-Probe)",
      description:
        "The xAPI-Probe survey system provides different questionnaires to you. It will mainly be used to understand your self-regulation learning skills. But also ask questions about the usability and trustworthiness of the TEL environment for research purposes. Answering these questions will help you to identify your personal learning strategies and reflect on the advantages and disadvantages of the TEL environment. The collected answers of the questionnaires will be sent to the TLA infrastructure and used to inform the self-regulation dashboard (SEREne). ",
      dataCollected: ["Answers to multiple choice and free text questions"],
      icon: "assignment",
      consented: false
    },
    {
      name: "Lecture Attendance application (LAtency)",
      id: "803d788f-4b3f-4806-be21-b2b1bf703da8",
      description:
        "The LAtency lecture attendance application keeps track which of the lectures you have been able to attend. This registry enables the TEL environment to send recommendations to you for relevant content or learning activities you might have missed due to absence from the course",
      dataCollected: [
        "The location data as estimated by the tracking beacon in the live lecture"
      ],
      purposes: [
        "Presence in lecture  based on your proximity to classroom beacons"
      ],
      icon: "gps_fixed",
      consented: false
    }
  ]
};
