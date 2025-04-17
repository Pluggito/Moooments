import { ArrowLeft } from "lucide-react";
import PageLoader from "../components/PageLoader";
import PropTypes from "prop-types";
import AlbumItems from "../components/AlbumItems";

const EventAlbumPage = ({
  loading,
  setLoading,
  handleCopyLink,
  linkRef,
  currentUrl,
  button,
  navigate,
}) => {
  const handleNavigation = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      {loading && <PageLoader />}
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => navigate("/preview")}
            className="p-2 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </button>
          <button
            onClick={handleNavigation}
            className="bg-zinc-900 p-3 rounded font-bold text-white hover:bg-zinc-800"
          >
            Go to Dashboard
          </button>
        </div>

        <AlbumItems
          title={"Your event album is ready!"}
          handleCopyLink={handleCopyLink}
          linkRef={linkRef}
          currentUrl={currentUrl}
          button={button}
        />
      </div>
    </div>
  );
};

EventAlbumPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default EventAlbumPage;
