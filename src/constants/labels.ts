export const LABELS = {
  TITLE: "AVKonnect",
  SUBMIT: "Submit",
  SKIP: "Skip",
  SAVE: "Save",
  REMOVE: "Remove",
  SAVE_SUCCESS: "Save was successful",
  SAVE_FAILED: "Something went wrong while saving",
  LOGIN_OR_REGISTER: "Login or register",
  PRESENT_DATE: "Present",
  SHOW_MORE: "Show more",
  SHOW_LESS: "Show less",

  // Home
  MADE_IN_INDIA: "Made In India",

  // Header
  LOGOUT: "Logout",
  FEEDBACK: "Feedback",
  FEEDBACK_HELPER: `Help us improve AVKonnect`,
  VIEW_PROFILE: "View Profile",

  // Feedback Labels
  FEEDBACK_TYPE: "Feedback Type",
  FEEDBACK_SUBJECT: "Title",
  FEEDBACK_DESCRIPTION: "Description",
  FEEDBACK_THANK_YOU: "Thank you for your feedback",
  FEEDBACK_SUBMIT_ERROR: "Something went wrong while submitting feedback",

  // Search Users
  SEARCH_RESULTS_FOR: "Search results for",
  SEARCH_NO_RESULTS_FOR: "No results found for",
  SEARCH_FOR: "Search for people",
  SEARCH_TEXT: "Search for someone you know..",
  SEARCH_NO_RESULTS: "No results found",
  SEARCH_ALL_RESULTS: "View all results",

  // Share Profile
  SHARE_PROFILE: "Share profile",
  COPY_PROFILE_LINK: "Copy profile link",

  // Image Upload Labels
  BACKGROUND_IMAGE_CROPPER_TITLE: "Background Image",
  DISPLAY_PICTURE_CROPPER_TITLE: "Display Picture",
  IMAGE_CROPPER_MESSAGE: "Drag around to reposition photo",
  USER_IMAGE_CHOOSE_IMAGE: "Choose Image",
  USER_IMAGE_CHANGE_IMAGE: "Change Image",
  USER_IMAGE_APPLY: "Apply",

  // User Info Labels
  USER_INFO_TITLE: "Edit User Information",
  USER_INFO_NAME: "Name",
  USER_INFO_HEADLINE: "Headline",
  USER_INFO_DOB: "Date of Birth",
  USER_INFO_GENDER: "Gender",
  USER_INFO_LOCATION: "Location",

  // About User labels
  ADD_SUMMARY: "Add Summary",
  ABOUT_FIELD_LABEL: "About",
  ABOUT_EDIT_TITLE: "About you",
  ABOUT_HEADLINE: "Lets add a few words about you",
  ABOUT_PLACEHOLDER:
    "You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences. You can also provide external links to your other portfolios",
  ABOUT_HELPER:
    "A brief summary of you, your acheievements and fields of interest pertaining to the media industry.",

  // User Skills Labels
  SKILLS_TITLE: "Skills",
  ADD_SKILLS: "Add Skills",
  EDIT_SKILLS: "Edit Skills",
  GIVEN_ENDORSEMENT: "given endorsement for this skill",
  ENDORSEMENT_HAVE: "have",
  ENDORSEMENT_HAS: "has",
  ENDORSEMENT_YOU: "You",
  ENDORSEMENT_AND: "and",
  ENDORSEMENT_CONNECTIONS: "connections",
  ADD_SKILL: "Add",
  MAX_SKILL_LIMIT: "Maximum number of skills you can add are",
  ENDORSEMENT_RELATIONSHIP: "Relationship",
  ENDORSEMENT_RATING_TITLE: (name: string): string =>
    `How would you rate ${name}'s skill?`,
  ENDORSEMENT_RELATIONSHIP_TITLE: (name: string): string =>
    `How do you know about ${name}'s skill?`,
  SKILLS_HELPER:
    "Skills that you are proficient in can be added here. You can also request your friends or colleagues to endorse your skills.",

  // User Experiences Labels
  EXPERIENCES_TITLE: "Experiences",
  ADD_EXPERIENCE: "Add experience",
  EDIT_EXPERIENCE: "Edit experience",
  EXPERIENCE_COLLOBORATORS: "Other Collaborators",
  EXPERIENCE_COMPANY_NAME: "Company Name",
  EXPERIENCE_DESCRIPTION: "Description",
  EXPERIENCE_INDUSTRY: "Industry",
  EXPERIENCE_ROLE: "Role",
  EXPERIENCE_NAME: "Company Name",
  EXPERIENCE_EMPLOYMENT_TYPE: "Employment Type",
  EXPERIENCE_ONGOING: "Presently working here",
  EXPERIENCE_START_DATE: "Start Date",
  EXPERIENCE_END_DATE: "End Date",
  EXPERIENCE_HELPER:
    "Your relevant career experiences can be highlighted here. They may be professional or personal experiences.",

  // User Projects Labels
  PROJECTS_TITLE: "Projects",
  ADD_PROJECT: "Add project",
  EDIT_PROJECT: "Edit Project",
  PROJECT_COLLOBORATORS: "Other Collaborators",
  PROJECT_COMPANY_NAME: "Company Name",
  PROJECT_DESCRIPTION: "Description",
  PROJECT_INDUSTRY: "Industry",
  PROJECT_ROLE: "Role",
  PROJECT_NAME: "Project Name",
  PROJECT_EMPLOYMENT_TYPE: "Employment Type",
  PROJECT_ONGOING: "Ongoing Project",
  PROJECT_START_DATE: "Start Date",
  PROJECT_END_DATE: "End Date",
  PROJECT_HELPER:
    "Professional or personal projects like films, shows, dramas, events etc. that you've closely worked on can be added here.",

  // User Certifications Labels
  CERTIFICATIONS_TITLE: "Certifications",
  ADD_CERTIFICATION: "Add certification",
  EDIT_CERTIFICATION: "Edit certification",
  CERTIFICATION_ISSUER_NAME: "Issuer",
  CERTIFICATION_DESCRIPTION: "Description",
  CERTIFICATION_INDUSTRY: "Industry",
  CERTIFICATION_NAME: "Certification Name",
  CERTIFICATION_LINK: "Certification Link",
  CERTIFICATION_NO_EXPIRY: "No expiry",
  CERTIFICATION_ISSUE_DATE: "Issue Date",
  CERTIFICATION_EXPIRY_DATE: "Expiry Date",
  CERTIFICATION_HELPER:
    "Any honours, certifications or license earned by you can be showcased here.",

  // Connection Labels
  CONNECTION_CONNECT: "Connect",
  CONNECTION_ACCEPT: "Accept",
  CONNECTION_REJECT: "Reject",
  CONNECTION_PENDING: "Pending",
  CONNECTION_WITHDRAW: "Withdraw",
  CONNECTION_CONNECTIONS: "Connections",
  CONNECTION_SENT: "Sent",
  CONNECTION_WITHDRAW_REQUEST:
    "Are you sure you want to withdraw your connection request?",
  CONNECTION_UNCONNECT: "Unconnect",
  MANAGE_NETWORK: "Manage my network",
  CONNECTION_FAILED: "Something went wrong while updating connection",
  CONNECTION_NO_PENDING_REQUESTS: "You have no pending connection requests!",
  CONNECTION_NO_CONNECTIONS:
    "You 0 connections! You may search and connect with people using the search bar.",
  CONNECTION_NO_SENT_CONNECTIONS: "You have no pending connection requests!",
};
