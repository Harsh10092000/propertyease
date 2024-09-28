import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import moment from "moment";
const Inbox = () => {
  const [mailContent, setMailContent] = useState([]);
  const [mailSentData, setMailSentData] = useState([]);
  const [selectedMail, setSelectedMail] = useState("");
  const [mailCont, setMailCont] = useState("");
  const [mailSub, setMailSub] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/invite/getMailContent`)
      .then((res) => {
        setMailContent(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/invite/getMailData`)
      .then((res) => {
        setMailSentData(res.data);
      });
  }, []);

  useEffect(() => {
    if (selectedMail !== "") {
      const a = mailContent.filter(
        (code) => code.id == selectedMail.content_id
      );
      setMailCont(a[0].mail_content);
      setMailSub(a[0].mail_subject);
    }
  }, [selectedMail]);

  const getFirstTwoLines = (text) => {
    const regex = /(<([^>]+)>)/gi;
    const newString = text.replace(regex, " ");
    const lines = newString.split("\n").slice(0, 2);
    return lines.map((line) => line.trim()).join("\n");
  };

  useEffect(() => {
    let searchWords = searchValue
      ?.toLowerCase()
      .split(",")
      .map((word) => word.trim());

    const filteredData = mailSentData.filter((contact) => {
      const parts = contact.email_id.split("@").flatMap((part) => part.split("."));
      const lowerCaseParts = parts.map((part) => part.toLowerCase());

      if (searchWords.length !== 0) {
        return searchWords.every((word) =>
          lowerCaseParts.some((part) => part.includes(word))
        );
      } else {
        return true;
      }
    });

    setResults(filteredData);
  }, [searchValue, mailSentData]);

  return (
    <div className="inbox-wrapper container-fluid">
      <div className="inbox">
        <div className="inbox-header">
          <div className="inbox-heading">Inbox <span class="badge">{mailSentData.length}</span></div>
          <div className="">
            <input
              type="text"
              className="form-control "
              placeholder="Search for a Email"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
            />
          </div>
        </div>
        <div
          data-orientation="horizontal"
          role="none"
          className=" divider shrink-0 bg-border h-[1px] w-full"
        ></div>

        <div className="row ml-0 mr-0 inbox-sec">
          <div className="col-md-4 recipient-list pl-0 pr-0">
            <div className="recipient-list-wrapper">
              {results.length > 0 ? results.map((item) => (
                <div
                  className="user-details"
                  onClick={() => setSelectedMail(item)}
                >
                  <div className="mail-header">
                    <div className="name">{item.email_id}</div>
                    <div className="date">
                      {moment(item.date_time).fromNow()}
                    </div>
                  </div>

                  {mailContent
                    .filter((code) => code.id == item.content_id)
                    .map((item2, index) => (
                      <>
                        <div className="mail-subject">{item2.mail_subject}</div>
                        <div
                          className="mail-test"
                          dangerouslySetInnerHTML={{
                            __html: getFirstTwoLines(
                              DOMPurify.sanitize(item2.mail_content)
                            ),
                          }}
                        ></div>
                      </>
                    ))}
                </div>
              )) : 
              <div className="text-center pt-3">
No results found
              </div>
              
              }
            </div>
          </div>

          <div className="col-md-8 recipient-message pl-0 pr-0">
            {selectedMail !== "" ?
            <div>
              <div className="content-header-wrapper">
                <div className="content-header">
                  <div className="name">{selectedMail.email_id}</div>
                  <div className="date">
                    {/* {moment(selectedMail.date_time).add(5,"h").add(30, "minutes").format("LL HH:mm:ss")} */}
                    {moment(selectedMail.date_time).format("LL HH:mm:ss")}
                  </div>
                </div>
                <div className="content-subject">{mailSub}</div>
              </div>

              <div
                data-orientation="horizontal"
                role="none"
                className=" divider shrink-0 bg-border h-[1px] w-full"
              ></div>
              {/* {mailContent.filter(code => code.id == selectedMail.content_id).map((item, index) => ( */}
              <div
                className="content-test"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(mailCont),
                }}
              ></div>
              {/* ))} */}
            </div>
          : 
          <div className="text-center pt-3">
            No conversation selected
          </div>
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
