import Navbar from "@/components/Navbar";
import CreateStoryCard from "@/components/CreateStoryCard";
import CloneVoiceCard from "@/components/CloneVoiceCard";

export default function DashboardPage() {
  return (

      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center gap-12">
        <CreateStoryCard />
        <CloneVoiceCard />
      </div>
    
  );
}