import { useState } from "react";
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
import { ColorPicker } from "./CustomControl";

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
  const [widgets, setWidgets] = useState(["users", "sales", "revenue", "tasks"]);
  const [colors, setColors] = useState({
    users: "#3b82f6",
    sales: "#10b981",
    revenue: "#8b5cf6",
    tasks: "#f59e0b"
  });

  // Sensors for DnD (Drag and Drop)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // useEffect hook for side effects, e.g., logging visibility changes
  // useEffect(() => {
  //   console.log("Visibility has changed:", visibility);
  // }, [visibility]); // Only rerun when visibility changes

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

  const handleColorChange = (widgetId, newColor) => {
    setColors(prev => ({
      ...prev,
      [widgetId]: newColor
    }));
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <div className="dashboard-container p-6">
        <div className="mb-6 flex gap-4">
          {Object.keys(colors).map(widgetId => (
            <div key={widgetId} className="flex items-center gap-2">
              <span className="text-sm capitalize">{widgetId}</span>
              <ColorPicker 
                value={colors[widgetId]}
                onChange={(color) => handleColorChange(widgetId, color)}
              />
            </div>
          ))}
        </div>

        <SortableContext items={widgets} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {widgets.map((widgetId) => {
              const IconComponent = getIconComponent(widgetId);
              return (
                <div 
                  key={widgetId} 
                  className="bg-white p-6 rounded-xl shadow-lg transition-all"
                  style={{ backgroundColor: colors[widgetId] + '20' }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: colors[widgetId] }}
                    >
                      <IconComponent className="text-white w-6 h-6" />
                    </div>
                    <span className="text-lg font-semibold capitalize">
                      {widgetId}
                    </span>
                  </div>
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