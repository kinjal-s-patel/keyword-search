import * as React from "react";
import * as Papa from "papaparse";
import styles from "./searchform.module.scss"; // ✅ Import CSS
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICsvSearchFormProps {
  context: WebPartContext;
}

const CsvSearchForm: React.FC<ICsvSearchFormProps> = ({ context }) => {   // ✅ Accept props here
  const [data, setData] = React.useState<any[]>([]);
  const [query, setQuery] = React.useState({
    person_name: "",
    person_title: "",
    person_email: "",
    person_location_city: "",    
    person_location_state: "",
    person_location_country: ""
  });
  const [results, setResults] = React.useState<any[]>([]);

  // Load CSV (⚠️ uses context for absolute path)
  React.useEffect(() => {
    const siteUrl = context.pageContext.web.absoluteUrl;   // ✅ Use SPFx context
    const fileUrl = `${siteUrl}/Shared Documents/apollo data.csv`;

    fetch(fileUrl)
      .then(res => res.text())
      .then(text => {
        const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
        setData(parsed.data);
      });
  }, [context]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery({ ...query, [e.target.name]: e.target.value });

  // Search function
  const handleSearch = () => {
    setResults(
      data.filter(row =>
        Object.keys(query).every(key =>
          !query[key as keyof typeof query]
            ? true
            : row[key]
                ?.toString()
                .toLowerCase()
                .includes(
                  query[key as keyof typeof query].toString().toLowerCase()
                )
        )
      )
    );
  };

   // ✅ Inject Full Page Styles
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      #SuiteNavWrapper,
      #spSiteHeader,
      #spLeftNav,
      .spAppBar,
      .sp-appBar,
      .sp-appBar-mobile,
      div[data-automation-id="pageCommandBar"],
      div[data-automation-id="pageHeader"],
      div[data-automation-id="pageFooter"] {
        display: none !important;
        height: 0 !important;
        overflow: hidden !important;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        overflow: hidden !important;
        background: #fff !important;
      }
      #spPageCanvasContent, .CanvasComponent, .CanvasZone, .CanvasSection, .control-zone {
        width: 100vw !important;
        height: 100vh !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        max-width: 100vw !important;
      }
      .ms-FocusZone {
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);
  }, []);


  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'auto',
        backgroundColor: '#fff',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    > 
    <div className={styles.container}>
      <h2 className={styles.title}> Search Keywords</h2>

      {/* Search Form */}
      <div className={styles.form}>
        {Object.keys(query).map(key => (
          <input
            key={key}
            name={key}
            placeholder={key.replace(/_/g, " ")} // nicer placeholder
            value={query[key as keyof typeof query]}
            onChange={handleChange}
            className={styles.input}
          />
        ))}
        <button onClick={handleSearch} className={styles.button}>
          Search
        </button>
      </div>

      {/* Results */}
      <h3 className={styles.resultsTitle}>Results</h3>
      {results.length ? (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Email</th>
               
                <th>City</th>
               
                <th>State</th>
               
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, i) => (
                <tr key={i}>
                  <td>{row.person_name}</td>
                  <td>{row.person_title}</td>
                  <td>{row.person_email}</td>
                  
                  <td>{row.person_location_city}</td>
             
                  <td>{row.person_location_state}</td>
                
                  <td>{row.person_location_country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.noResults}>No records found.</p>
      )}
    </div>
    </div>
  );
};

export default CsvSearchForm;
