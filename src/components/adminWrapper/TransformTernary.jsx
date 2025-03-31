import moment from "moment";

function TransformTernary(val) {
  return val ? val : "-";
}
export default TransformTernary;

export function TransformNumber(val) {
  return val ? `+91 ${val}` : "-";
}

export function TransformDate(val) {
  return val ? moment(val).format("DD MMM, YY") : "-";
}

export function TransformId(val, val2) {
  console.log(val, val2);
  return val !== null && val !== 0 ? `${val2} + ${val}` : "-";
}

export function TransformPlanStatus(val1, val2) {
  console.log(val1, val2);
  return val1 === 1 ? (
    <span className="current-status-green">Access Granted By Admin</span>
  ) : val2 === 1 ? (
    <span className="current-status-green">Active</span>
  ) : val2 === 2 ? (
    <span className="current-status-red">Active but no listings</span>
  ) : val2 === 3 ? (
    <span className="current-status-red">Plan Expired </span>
  ) : (
    "-"
  );
}

export function TransformTranId(val1, val2, val3) {
    console.log(val1, val2);
    return val1 === 1 ? (
      <span className="">-</span>
    ) : val2 === 1 ? (
      <span style={{color: "#6cbd7e"}}>{val3}</span>
    ) : val2 === 2 ? (
      <span style={{color: "#f6b500"}}>{val3}</span>
    ) : val2 === 3 ? (
      <span style={{color: "#f6b500"}}>{val3}</span>
    ) : (
      "-"
    );
  }
