import { Client } from "./components/client/Client";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* <SimpleHeader title="d" /> */}
      <Client />
    </div>
  );
}
