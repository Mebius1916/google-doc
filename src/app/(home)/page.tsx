import { Narbar } from "./narbar";
import { TemplateGallery } from "./templates-galleryy";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="ixed top-0 left-0 right-0 z-10 h-16 bg-white">
        <Narbar />
      </div>
      <div className="mt-16">
      <TemplateGallery/>
      </div>
    </div>
  );
};

export default Home;
