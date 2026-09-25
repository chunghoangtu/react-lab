import CollapsibleList from "@/components/CollapsibleList";
import DismissibleAlert from "@/components/DismissibleAlert";
import DraggableCard from "@/components/DraggableCard";
import DragDropLists from "@/components/DraggableList";
import FeaturesList from "@/components/FeaturesList";
import LiveBadge from "@/components/LiveBadge";
import SimpleAnimation from "@/components/SimpleAnimation";
import StepSwitcher from "@/components/StepSwitcher";

export default function DemoPage() {
  return (
    <div className=''>
      <section>
        <LiveBadge />
        <CollapsibleList />
        <div className='max-w-full grid grid-cols-2 m-5 p-5'>
          <DismissibleAlert />
          <StepSwitcher />
        </div>
        <DragDropLists />
        <DraggableCard />
        <FeaturesList />
        <SimpleAnimation />
      </section>
    </div>
  );
}
