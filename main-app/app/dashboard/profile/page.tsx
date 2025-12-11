import Breadcrumbs from "../components/Breadcrumbs";
import { requireSessionUser } from "@/lib/session";
import ProfilePicture from "../components/ProfilePicture";
import PfpInput from "./components/PfpInput";
import { isPublicServiceOnline } from "@/lib/publicService";

const ProfilePage = async () => {
  const user = await requireSessionUser();
  const publicServiceOnline = await isPublicServiceOnline();

  return (
    <div className="bg-gray-100 flex-1">
      <Breadcrumbs subpage="Profile" />
      <main>
        <section className="panel max-w-1/2 mx-auto flex flex-col items-center">
          <h1 className="panel-title">Your profile</h1>
          <div className="flex mx-auto justify-center gap-7 my-4">
            <ProfilePicture size={70} url={user.pfpUrl} />
            <div className="my-auto">
              <h2 className="text-3xl font-semibold">{user.name}</h2>
              <h3 className="text-xl">@{user.username}</h3>
            </div>
          </div>
          <p className="text-center text-md text-(--col-text-secondary)">
            {user.email}
          </p>
          <fieldset className="fieldset my-10">
            <legend className="fieldset-legend">
              Select a profile picture
            </legend>
            {publicServiceOnline ? (
              <PfpInput />
            ) : (
              <p>
                Profile updates are disabled while public service is offline
              </p>
            )}
          </fieldset>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
