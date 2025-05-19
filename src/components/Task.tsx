import type { ITask } from "../interfaces/ITask";

type Props = {
  task: ITask;
  showModal: (task: ITask) => void;
  updateTask: (task: ITask) => void;
};

function Task(props: Props) {
  return (
    <div className="card w-full bg-primary text-primary-content shadow-xl sm:w-[49.5%] md:w-[32.5%] lg:w-[24.5%]">
      <div className="card-body">
        <div className="flex justify-center">
          {props.task?.is_completed ? (
            <span className="badge badge-success font-bold p-4">Completed</span>
          ) : (
            <span className="badge badge-error font-bold p-4">
              Not Completed
            </span>
          )}
        </div>
        <h2 className="card-title">{props.task?.title}</h2>

        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {props.task?.description}
        </p>
        <div className="card-actions">
          <button className="btn w-full" onClick={() => props.updateTask(props.task)}>
            Update Task
          </button>
          <button className="btn w-full" onClick={() => props.showModal(props.task)}>
            Show Full Description
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;
