import { priceFormat } from "./helper"
export const ShowPrice = (pro_ad_type, pro_amt) => {
    return  pro_ad_type === "Sale" ? (
      "₹ " + priceFormat(pro_amt)
    ) : (
      <>
        ₹ {priceFormat(pro_amt)}
        <span className="slash-month"> /month</span>
      </>
    )
  }