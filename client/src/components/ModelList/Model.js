import { FaTimes } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import { deleteModel } from "../../api/api";
import "./Model.css";

export default function Model({
  model,
  selectedModel,
  setModel,
  updateModels,
  resetAnomaliesAndFeatures,
}) {
  const delete_Model = () => {
    // Send request to delete this model
    deleteModel(model.model_id);

    // Check if the selected model is the deleted one
    if (model.model_id === selectedModel.model_id) {
      resetAnomaliesAndFeatures();
      setModel({});
    }

    // Send request to update models
    updateModels();
  };

  const isSelected = () => model?.model_id === selectedModel?.model_id;

  return (
    <li
      className={`model ${isSelected() ? "selected" : ""}`}
      style={{ justiftyContent: "center", alignItems: "center" }}
      onClick={() => setModel(model)}
    >
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Upload Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{model.model_id}</td>
            <td>{model.upload_time.substr(0, 10)}</td>
            <td>{model.status}</td>
          </tr>
        </tbody>
      </Table>
      <FaTimes
        size="2rem"
        style={{ color: "red", cursor: "pointer" }}
        onClick={delete_Model}
      />
    </li>
  );
}
