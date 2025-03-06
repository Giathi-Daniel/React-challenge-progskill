import { useSortable } from '@dnd-kit/sortable';
import DashboardCard from './DashboardCard'
import { CSS } from '@dnd-kit/utilities';



export const SortableWidget = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id
});

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  touchAction: 'none'
};

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <DashboardCard {...props} />
    </div>
  );
};
