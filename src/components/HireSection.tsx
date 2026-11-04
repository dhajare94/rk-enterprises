import HireBoard from "./HireBoard";
import { TEL_URL, PHONE_DISPLAY } from "../config";
/** The hire board on the blue field, with a small stack of site photographs beside it. */
export default function HireSection({ title = "Book plant for this week", preset }: { title?: string; preset?: string }) {
  return <section className="sec field field--b hire" id="hire"><div className="wrap hire__in">
    <div className="hire__l rv">
      <h2 className="h-head">{title}</h2>
      <p className="lead">Direct hire or direct sale. Four picks, WhatsApp opens with the job written out, and someone at our Nilaje office replies. Rather talk? <a href={TEL_URL}>{PHONE_DISPLAY}</a>, from 5 a.m.</p>
      <div className="hire__pics">
        <img className="hire__img" src="/about-platform.webp" alt="Rope suspended platform inspected before dispatch" loading="lazy" width={1468} height={1071} />
        <img src="/rental.jpg" alt="Construction plant on rental" loading="lazy" />
        <img src="/sale.jpg" alt="Construction equipment for sale" loading="lazy" />
      </div>
    </div>
    <div className="hire__r rv"><HireBoard preset={preset} /></div>
  </div></section>;
}
