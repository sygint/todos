import InputForm from "./InputForm"

type EditTaskProps = {
    onEdit: (data: string) => void;
    value?: string | undefined;
}

export default function EditTask({  onEdit: onEdit, value }: EditTaskProps) {
    return (
        <InputForm onSubmit={onEdit} buttonText="save" placeholder="edit a task" value={value} />
    )
}
