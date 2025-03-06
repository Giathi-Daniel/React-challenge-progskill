import { useState, useEffect } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  BarChart,
  Users,
  ShoppingCart,
  CheckCircle
} from "lucide-react";
import { ColorPicker } from "./CustomControls";

// // Types for presets
// const PRESETS = {
//   DEFAULT: "default",
//   MINIMAL: "minimal",
//   ANALYTICS: "analytics",
// };

// const presetConfigs = {
//   [PRESETS.DEFAULT]: {
//     widgets: ["users", "sales", "revenue", "tasks"],
//     visibility: { users: true, sales: true, revenue: true, tasks: true },
//   },
//   [PRESETS.MINIMAL]: {
//     widgets: ["users", "tasks"],
//     visibility: { users: true, sales: false, revenue: false, tasks: true },
//   },
//   [PRESETS.ANALYTICS]: {
//     widgets: ["sales", "revenue", "tasks"],
//     visibility: { users: false, sales: true, revenue: true, tasks: true },
//   },
// };

// Helper function to get icon component based on widget id
function getIconComponent(widgetId) {
  switch (widgetId) {
    case "users":
      return Users;
    case "sales":
      return ShoppingCart;
    case "revenue":
      return BarChart;
    case "tasks":
      return CheckCircle;
    default:
      return Users;
  }
}

const Dashboard = () => {
  // State management
  const [widgets, setWidgets] = useState(["users", "sales", "revenue", "tasks"]);
  const visibility = useState({
    users: true,
    sales: true,
    revenue: true,
    tasks: true,
  });

  // Sensors for DnD (Drag and Drop)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // useEffect hook for side effects, e.g., logging visibility changes
  useEffect(() => {
    console.log("Visibility has changed:", visibility);
  }, [visibility]); // Only rerun when visibility changes

  // Function to handle the widget drop (DnD logic)
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]} // Restrict elements to window edges
    >
      <div className="dashboard-container">
        {/* Render Color Picker */}
        <ColorPicker />

        <SortableContext
          items={widgets}
          strategy={verticalListSortingStrategy}
        >
          <div className="widgets-list">
            {widgets.map((widgetId) => {
              const IconComponent = getIconComponent(widgetId);
              return (
                <div key={widgetId} className="widget-card">
                  <IconComponent />
                  <span>{widgetId}</span>
                </div>
              );
            })}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default Dashboard;
