import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();

  const handleSignOut = async () => {
    "use server";
    await signOut();
   
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div>
      {JSON.stringify(session)}
      <form action={handleSignOut}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
