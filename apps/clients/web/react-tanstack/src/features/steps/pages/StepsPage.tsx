import { getRouteApi } from "@tanstack/react-router";

import StepPage0 from "@/features/steps/pages/StepPage0";
import StepPage1 from "@/features/steps/pages/StepPage1";
import StepPage2 from "@/features/steps/pages/StepPage2";
import StepPage3 from "@/features/steps/pages/StepPage3";

const route = getRouteApi("/steps");

export const LAST_STEP = 3;

export default function StepsPage() {
  const { step = 0, username } = route.useSearch();
  const navigate = route.useNavigate();

  const move = (step: number) =>
    navigate({
      search: (prev) => ({ ...prev, step }),
      // Imperative declaration here. Needs to be set on all navigations to this page.
      // Better using the declarative approach in the route definition (look for createRouteMask in App.tsx)
      // mask: { search: (prev)  => ({ ...prev, step: undefined }) },
    });
  const prev = () => move(step - 1);
  const next = () => move(step + 1);

  return (
    <div className='flex flex-col gap-2'>
      <h3>Steps</h3>
      <span>
        Hello <b>{username}</b>. This is a multi-step process. You are currently on step{" "}
        <b>{step}</b>.
      </span>

      <div className='py-8'>
        {step === 0 && <StepPage0 />}
        {step === 1 && <StepPage1 />}
        {step === 2 && <StepPage2 />}
        {step === 3 && <StepPage3 />}
      </div>

      <div className='flex gap-2'>
        <button
          disabled={step <= 0}
          onClick={prev}
        >
          <label className='mr-1 size-4'>Previous</label>
        </button>
        <button
          disabled={step >= LAST_STEP}
          onClick={next}
        >
          <label className='ml-1 size-4'>Next</label>
        </button>
      </div>
    </div>
  );
}
