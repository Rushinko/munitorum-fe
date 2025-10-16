import type { Route } from "./+types/calculator";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "~/components/ui/button/button";
import useToolsStore from "./store";
import { PlusIcon } from "lucide-react";
import DatasheetCard from "~/components/datasheets/customDatasheet";
import { runCalculation } from "./lib";
import { useState } from "react";
import { defaultDatasheetModifiers, type Datasheet, type DatasheetActions, type DatasheetModifiers } from "~/components/datasheets/types";
import ModifiersTable from "~/components/datasheets/modifiersTable";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "~/components/ui/card/card";
import { Separator } from "~/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Link } from "react-router";
import ResultsSection from "~/components/calculator/resultsSection";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Munitorum" },
    { name: "Browse", content: "Welcome to the Browse!" },
  ];
}
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return {}
}

const DatasheetList = ({ datasheets, datasheetActions }: { datasheets: Datasheet[], datasheetActions: DatasheetActions }) => {
  return (
    <motion.div className="flex max-w-md md:max-w-full justify-start gap-4 flex-col">
      <AnimatePresence mode="sync">
        {datasheets.map(ds => (
          <motion.div
            key={ds.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
            transition={{ type: "tween", duration: 0.1 }}
          >
            <DatasheetCard datasheet={ds} actions={datasheetActions} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

const AttackerDefenderCard = ({ title, onAdd, children }: { title: string, onAdd: () => void, children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 min-w-lg max-w-xl xl:max-w-full h-fit flex-col gap-4">
      <h2 className="text-xl font-bold ml-2">{title}
        <Button className="ml-2 border-border border" variant="secondary" onClick={onAdd}><PlusIcon /></Button>
      </h2>
      {children}
    </div>
  );
}

export default function Calculator(props: Route.ComponentProps) {
  const [modifiers, setModifiers] = useState<DatasheetModifiers>(defaultDatasheetModifiers);
  const datasheets = useToolsStore(state => state.datasheets);
  const attackerIds = useToolsStore(state => state.attackersIds);
  const defenderIds = useToolsStore(state => state.defendersIds);
  const datasheetActions = useToolsStore(state => state.datasheetActions);
  const results = useToolsStore(state => state.results);
  const addDatasheet = useToolsStore(state => state.addDatasheet);
  const addAttacker = useToolsStore(state => state.addAttacker);
  const addDefender = useToolsStore(state => state.addDefender);
  const setResults = useToolsStore(state => state.setResults);

  const handleAddDatasheet = (isAttacker: boolean) => {
    const newId = addDatasheet();
    if (isAttacker) {
      addAttacker(newId);
    } else {
      addDefender(newId);
    }
  };

  const handleCalculate = () => {
    const attacker = datasheets.find(ds => attackerIds.includes(ds.id));
    const defender = datasheets.find(ds => defenderIds.includes(ds.id));
    if (attacker && defender) {
      const results = runCalculation(datasheets.filter(ds => attackerIds.includes(ds.id)), datasheets.filter(ds => defenderIds.includes(ds.id)), modifiers);
      if (results === null) {
        return;
      }
      setResults(results);
    }
  }

  return (
    <div className="flex flex-col xs:max-w-sm sm:w-lg md:w-7xl p-4 gap-4">
      <Breadcrumb className="hidden sm:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/app">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/app/tools">Tools</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/app/tools/calculator">Calculator</Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="w-sm sm:w-full flex flex-col gap-4 p-2">
        {/* <Separator /> */}
        <ModifiersTable modifiers={modifiers} updateModifier={(key, value) => setModifiers(prev => ({ ...prev, [key]: value }))} />
      </Card>
      <div className="w-full flex flex-col gap-4 max-w-full">
        <div className="flex flex-wrap justify-start gap-8 mb-8">
          <AttackerDefenderCard title="Attackers" onAdd={() => handleAddDatasheet(true)}>
            <DatasheetList datasheets={datasheets.filter(ds => attackerIds.includes(ds.id))} datasheetActions={datasheetActions} />
          </AttackerDefenderCard>

          <AttackerDefenderCard title="Defenders" onAdd={() => handleAddDatasheet(false)}>
            <DatasheetList datasheets={datasheets.filter(ds => defenderIds.includes(ds.id))} datasheetActions={datasheetActions} />
          </AttackerDefenderCard>
        </div>
        <CardFooter className="flex justify-center">
          <Button size="2xl" variant="default" onClick={handleCalculate} disabled={!attackerIds.length || !defenderIds.length}>Calculate</Button>
        </CardFooter>
      </div >
      {
        results && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold mx-2">Results</h2>
            </CardHeader>
            <Separator />
            <CardContent>
              <ResultsSection results={results} />
            </CardContent>
          </Card>
        )
      }
    </div >
  );
}
