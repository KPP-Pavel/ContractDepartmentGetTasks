export function Loading(props) {
    var note=props.note?props.note:'Отправка';
    return <div className="d-flex align-items-center my-2">
        <strong>{note}...</strong>
        <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
    </div>
}