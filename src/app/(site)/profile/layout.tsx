import ProfileSidebar from "@/src/features/profile/components/ProfileSidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container py-12 md:py-16 flex gap-4">
      <div className="w-1/4">
        <ProfileSidebar />
      </div>
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
};

export default ProfileLayout;
