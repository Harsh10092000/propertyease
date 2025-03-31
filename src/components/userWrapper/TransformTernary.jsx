import moment from "moment";

function TransformTernary(val) {
    return val ? val : "-";
}
export default TransformTernary;


export function TransformNumber(val) {
    return val ? `+91 ${val}` : "-";
}

export function TransformDate(val) {
    const date = moment(val);
    return date.isValid() ? moment(val).format("DD MMM, YY") : "-";
}

export function TransformId(val, val2) {
    console.log(val, val2);
    return val !== null && val !== 0 ? `${val2} + ${val}` : "-";
}

export function TransformPlanStatus(val1, val2) {
    console.log(val1, val2);
   return val1 === 1 ? <span className="current-status-green">Access Granted By Admin</span> : val2 !== 0 && val2 !== null ? <span className="current-status-green">Active</span> : "-"
}