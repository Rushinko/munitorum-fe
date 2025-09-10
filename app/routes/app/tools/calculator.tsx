import type { Route } from "./+types/calculator";
import { Button } from "~/components/ui/button/button";
import useToolsStore from "./store";
import { PlusIcon } from "lucide-react";
import DatasheetCard from "~/components/datasheets/customDatasheet";
import { calculateWeapon } from "./lib";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "Browse", content: "Welcome to the Browse!" },
  ];
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return {}
}

export default function Calculator(props: Route.ComponentProps) {
  const datasheets = useToolsStore(state => state.datasheets);
  const attackerIds = useToolsStore(state => state.attackersIds);
  const defenderIds = useToolsStore(state => state.defendersIds);
  const datasheetActions = useToolsStore(state => state.datasheetActions);
  const addDatasheet = useToolsStore(state => state.addDatasheet);
  const addAttacker = useToolsStore(state => state.addAttacker);
  const addDefender = useToolsStore(state => state.addDefender);

  const handleAddDatasheet = (isAttacker: boolean) => {
    const newId = addDatasheet();
    if (isAttacker) {
      addAttacker(newId);
    } else {
      addDefender(newId);
    }
  };

  const handleCalcTest = () => {
    console.log("Running calculation test...");
    const attacker = datasheets.find(ds => attackerIds.includes(ds.id));
    const defender = datasheets.find(ds => defenderIds.includes(ds.id));
    if (attacker && defender) {
      console.log("Attacker:", attacker);
      console.log("Defender:", defender);
      const result = calculateWeapon(attacker.weaponProfiles[0], defender);
      console.log("Calculation result:", result);
    }
  }

  return (
    <div className="w-full flex flex-col p-4 gap-4">
      <h1 className="text-2xl mb-4">Calculator</h1>
      <div className="flex"><Button variant="default" onClick={handleCalcTest}>Calculate</Button></div>
      <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-8">
        <div className="flex flex-col gap-4 max-w-322">
          <h2 className="text-xl font-bold mx-2">Attackers
            <Button className="ml-2" variant="secondary" onClick={() => handleAddDatasheet(true)}><PlusIcon /></Button>
          </h2>
          {datasheets.filter(ds => attackerIds.includes(ds.id)).map(ds => (
            <DatasheetCard datasheet={ds} actions={datasheetActions} />
          ))}
        </div>

        <div className="flex flex-col gap-4">

          <h2 className="text-xl font-bold ml-2">Defenders
            <Button className="ml-2" variant="secondary" onClick={() => handleAddDatasheet(false)}><PlusIcon /></Button>
          </h2>
          {datasheets.filter(ds => defenderIds.includes(ds.id)).map(ds => (
            <DatasheetCard datasheet={ds} actions={datasheetActions} />
          ))}
        </div>
      </div>
    </div>
  );
}
