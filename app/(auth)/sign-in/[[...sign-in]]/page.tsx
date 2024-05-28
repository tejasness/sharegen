import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto max-w-min mt-16">
      <SignIn />
    </div>
  );
}
