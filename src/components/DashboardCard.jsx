import { useState, useEffect, useReducer} from "react";

import {
  DndContext,
  closestCenter,
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
  CheckCircle,
  Settings,
  RefreshCw,
  RotateCcw,
} from "lucide-react";


import { ColorPicker } from "./CustomControls";

// Types

const PRESETS = {
  DEFAULT: "default",

  MINIMAL: "minimal",

  ANALYTICS: "analytics",
};

const presetConfigs = {
  [PRESETS.DEFAULT]: {
    widgets: ["users", "sales", "revenue", "tasks"],

    visibility: { users: true, sales: true, revenue: true, tasks: true },
  },

  [PRESETS.MINIMAL]: {
    widgets: ["users", "tasks"],

    visibility: { users: true, sales: false, revenue: false, tasks: true },
  },

  [PRESETS.ANALYTICS]: {
    widgets: ["sales", "revenue", "tasks"],

    visibility: { users: false, sales: true, revenue: true, tasks: true },
  },
};

// Reducer for undo/redo

function dashboardReducer(state, action) {
  switch (action.type) {
    case "SET_STATE":
      return { ...action.payload };

    case "UPDATE_WIDGETS":
      return {
        ...state,

        history: [
          ...state.history.slice(0, state.current + 1),
          state.currentState,
        ],

        currentState: action.payload,

        currentIndex: state.currentIndex + 1,
      };

    default:
      return state;
  }
}

const DashboardCard = ({
  id,
  title,
  value,
  icon: Icon,
  config,
  onConfigChange,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative p-6 bg-white shadow-lg rounded-xl group">
      <div className="absolute transition-opacity opacity-0 top-2 right-2 group-hover:opacity-100">
        <button
          onClick={() => setShowSettings(true)}
          className="p-1 rounded-lg hover:bg-gray-100"
        >
          <Settings className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Widget Settings Modal */}

      {showSettings && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-10 p-4 bg-white/95 backdrop-blur-sm rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">{title} Settings</h4>

            <button onClick={() => setShowSettings(false)}>×</button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Background Color</label>

              <ColorPicker
                value={config.color}
                onChange={(color) => onConfigChange(id, { color })}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Value</label>

              <input
                type="text"
                value={config.value}
                onChange={(e) => onConfigChange(id, { value: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
      )}

      <div className={`p-4 rounded-xl ${config.color} w-fit`}>
        <Icon className="w-8 h-8 text-white" />
      </div>

      <h3 className="mt-4 text-sm font-bold text-gray-700">{title}</h3>

      <p className="text-xl font-semibold text-gray-500">{config.value}</p>
    </div>
  );
};

const DashboardCards = () => {
  const [state, dispatch] = useReducer(dashboardReducer, {
    history: [],

    currentState: {
      widgetOrder: ["users", "sales", "revenue", "tasks"],

      widgetConfigs: {
        users: { color: "bg-blue-500", value: "1,250" },

        sales: { color: "bg-green-500", value: "$23,400" },

        revenue: { color: "bg-purple-500", value: "$5,120" },

        tasks: { color: "bg-yellow-500", value: "87%" },
      },

      visibility: { users: true, sales: true, revenue: true, tasks: true },
    },

    currentIndex: 0,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),

    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Undo/Redo functionality

  const canUndo = state.currentIndex > 0;

  const canRedo = state.currentIndex < state.history.length - 1;

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = state.currentState.widgetOrder.indexOf(active.id);

      const newIndex = state.currentState.widgetOrder.indexOf(over.id);

      const newOrder = arrayMove(
        state.currentState.widgetOrder,
        oldIndex,
        newIndex
      );

      dispatch({
        type: "UPDATE_WIDGETS",

        payload: { ...state.currentState, widgetOrder: newOrder },
      });
    }
  };

  const handlePreset = (presetKey) => {
    const preset = presetConfigs[presetKey];

    dispatch({
      type: "UPDATE_WIDGETS",

      payload: {
        ...state.currentState,

        widgetOrder: preset.widgets,

        visibility: preset.visibility,
      },
    });
  };

  const handleConfigChange = (widgetId, newConfig) => {
    const updatedConfigs = {
      ...state.currentState.widgetConfigs,

      [widgetId]: {
        ...state.currentState.widgetConfigs[widgetId],
        ...newConfig,
      },
    };

    dispatch({
      type: "UPDATE_WIDGETS",

      payload: { ...state.currentState, widgetConfigs: updatedConfigs },
    });
  };

  // Persist to localStorage

  useEffect(() => {
    localStorage.setItem("dashboardState", JSON.stringify(state));
  }, [state]);

  return (
    <div className="p-6 mt-[5rem] relative">
      <div className="fixed z-20 flex gap-2 p-3 bg-white rounded-lg shadow-lg top-4 right-4">
        <button
          onClick={() => handlePreset(PRESETS.DEFAULT)}
          className="px-3 py-1 text-blue-600 bg-blue-100 rounded"
        >
          Default
        </button>

        <button
          onClick={() => handlePreset(PRESETS.MINIMAL)}
          className="px-3 py-1 text-green-600 bg-green-100 rounded"
        >
          Minimal
        </button>

        <button
          onClick={() => handlePreset(PRESETS.ANALYTICS)}
          className="px-3 py-1 text-purple-600 bg-purple-100 rounded"
        >
          Analytics
        </button>

        <div className="mx-4 border-l border-gray-200" />

        <button
          disabled={!canUndo}
          onClick={() => dispatch({ type: "UNDO" })}
          className="px-2 py-1 disabled:opacity-50"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          disabled={!canRedo}
          onClick={() => dispatch({ type: "REDO" })}
          className="px-2 py-1 disabled:opacity-50"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <SortableContext
          items={state.currentState.widgetOrder}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {state.currentState.widgetOrder.map(
              (widgetId) =>
                state.currentState.visibility[widgetId] && (
                  <SortableWidget
                    key={widgetId}
                    id={widgetId}
                    title={widgetId.charAt(0).toUpperCase() + widgetId.slice(1)}
                    icon={getIconComponent(widgetId)}
                    config={state.currentState.widgetConfigs[widgetId]}
                    onConfigChange={handleConfigChange}
                  />
                )
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

// Helper functions

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

export default DashboardCards;
