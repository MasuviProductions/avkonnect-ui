import PostPreview from "../Post/PostPreview";
import AboutResourceProvider from "../../contexts/AboutResourceContext";

const TestContainer: React.FC = () => {
  return (
    <>
      <AboutResourceProvider
        id="507651e6-9037-4450-b20e-6cf67da9f412"
        type="post"
        sourceId="63adddf5-a54e-4a4e-a723-b76caea6cfe1"
        sourceType="user"
        reactionsCount={{
          love: 1,
          like: 0,
          support: 0,
          laugh: 0,
          sad: 0,
        }}
        commentsCount={1}
        userReaction="love"
        createdAt={new Date("2022-08-17T04:37:48.462Z")}
        relatedSourceMap={{
          "63adddf5-a54e-4a4e-a723-b76caea6cfe1": {
            id: "63adddf5-a54e-4a4e-a723-b76caea6cfe1",
            backgroundImageUrl:
              "https://avkonnect-dev.s3.ap-south-1.amazonaws.com/63adddf5-a54e-4a4e-a723-b76caea6cfe1/background_image_d4962b3a-4d1e-4443-8f5c-c1aca223e7cd",
            displayPictureUrl:
              "https://avkonnect-dev.s3.ap-south-1.amazonaws.com/63adddf5-a54e-4a4e-a723-b76caea6cfe1/display_picture_792f45ba-6240-4015-b9a7-ae0c73e5dfb0",
            email: "akashkrishnan98@gmail.com",
            headline: "Software Engineer @ Cimpress India",
            name: "Akash Krishnan",
          },
        }}
      >
        <PostPreview />
      </AboutResourceProvider>
    </>
  );
};

export default TestContainer;
