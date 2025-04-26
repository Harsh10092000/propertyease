// import { priceFormat } from "./helper"
// export const ShowPrice = (pro_ad_type, pro_amt, pro_negotiable) => {
//     return  pro_ad_type === "Sale" ? (
//       "₹ " + priceFormat(pro_amt) + <span>(pro_negotiable == "Yes" ? "Negotiable" : "Non-Negotiable")</span>
//     ) : (
//       <>
//         ₹ {priceFormat(pro_amt)}
//         <span className="slash-month"> /month {(pro_negotiable == "Yes" ? "Negotiable" : "Non-Negotiable")}</span>
//       </>
//     )
//   }


import { priceFormat } from "./helper";

export const ShowPrice = (pro_ad_type, pro_amt, pro_negotiable) => {
  const isNegotiable = pro_negotiable === "Yes" ? "(Negotiable)" : "(Non-Negotiable)";

  return pro_ad_type === "Sale" ? (
    <>
      ₹ {priceFormat(pro_amt)} <span className="negotiable-status">{isNegotiable}</span>
    </>
  ) : (
    <>
      ₹ {priceFormat(pro_amt)}
      <span className="slash-month"> /month <span className="negotiable-status">{isNegotiable}</span></span>
    </>
  );
};


// import { priceFormat } from "./helper"
export const ShowPrice2 = (pro_ad_type, pro_amt) => {
    return  pro_ad_type === "Sale" ? (
      "₹ " + priceFormat(pro_amt)
    ) : (
      <>
        ₹ {priceFormat(pro_amt)}
        <span className="slash-month"> /month </span>
      </>
    )
}