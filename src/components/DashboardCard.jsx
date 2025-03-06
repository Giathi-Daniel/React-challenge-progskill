import { useState, useEffect, useReducer} from "react";
import PropTypes from "prop-types";
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
