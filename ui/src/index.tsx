import * as React from "react";
import Moment from "react-moment";
import { ApplicationSet } from "./model/applicationset";
import { HealthStatus, Tree } from "./model/tree";

const MAP_STATUS = {
  Healthy: { name: "fa-heart", spin: false, color: "rgb(24, 190, 148)" },
  Progressing: {
    name: "fa-circle-notch",
    spin: true,
    color: "rgb(13, 173, 234)",
  },
  Degraded: {
    name: "fa-heart-broken",
    spin: false,
    color: "rgb(233, 109, 118)",
  },
  Suspended: {
    name: "fa-pause-circle",
    spin: false,
    color: "rgb(118, 111, 148)",
  },
  Missing: { name: "fa-ghost", spin: false, color: "rgb(244, 192, 48)" },
  Unknown: {
    name: "fa-question-circle",
    spin: false,
    color: "rgb(204, 214, 221)",
  },
};

export const Extension = (props: { tree: Tree; resource: ApplicationSet }) => {
  console.log(props);

  var items = props.tree.nodes.filter((item) =>
    // filter the one owned by the ApplicationSet
    item.parentRefs?.find(
      (parentRef) => parentRef.uid === props.resource.metadata.uid
    )
  );

  return (
    <div>
      <div
        style={{
          background: "#fff",
          width: "100%",
          boxShadow: "1px 1px 1px #ccd6dd",
          borderRadius: "4px",
          border: "1px solid transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {Object.keys(MAP_STATUS).map((key: HealthStatus) => (
            <div
              style={{
                margin: "1rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <i
                qe-id="utils-health-status-title"
                title={key}
                className={`fa ${MAP_STATUS[key].name}`}
                style={{
                  color: MAP_STATUS[key].color,
                  marginBottom: "0.50rem",
                }}
              ></i>
              {key}: {items.filter((item) => item.health.status == key).length}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "40%" }}>
        {items.map((item) => (
          <div
            title={`Kind: Application Namespace: ${item.namespace} Name: ${item.name}`}
            style={{
              marginTop: "2rem",
              padding: "0.2rem",
              boxShadow: "1px 1px 1px #ccd6dd",
              borderRadius: "4px",
              border: "1px solid transparent",
              backgroundColor: "#fff",
              color: "#363c4a",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "60px",
                flexGrow: "1",
                color: "#495763",
                textAlign: "center",
              }}
            >
              <i title="Application" className="icon argo-icon-application"></i>
              <br />
              <div style={{ fontSize: ".7em", color: "#6d7f8b" }}>
                application
              </div>
            </div>
            <div
              style={{
                flexGrow: "100",
                padding: "10px 20px 10px 10px",
                lineHeight: ".95",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: ".8em",
                  paddingBottom: "5px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "left",
                }}
              >
                {item.name}
              </div>
              <div style={{ fontSize: ".8em" }}>
                <i
                  qe-id="utils-health-status-title"
                  title={item.health.status}
                  className={`fa ${MAP_STATUS[item.health.status].name}${
                    MAP_STATUS[item.health.status].spin ? " fa-spin" : ""
                  }`}
                  style={{ color: MAP_STATUS[item.health.status].color, marginRight: "0.3rem" }}
                ></i>
                <a href={`/applications/${item.name}`} title="Open application">
                  <i className="fa fa-external-link-alt"></i>
                </a>
              </div>
            </div>
            <div style={{ flexGrow: "1", alignSelf: "flex-end" }}>
              {item.createdAt ? (
                <Moment
                  style={{
                    backgroundColor: "#ccd6dd",
                    color: "#495763",
                    border: "1px solid #8fa4b1",
                    borderRadius: "5px",
                    padding: "0 5px",
                    fontSize: ".6em",
                    textTransform: "lowercase",
                    marginRight: "1px",
                  }}
                  fromNow={true}
                  ago={true}
                >
                  {item.createdAt}
                </Moment>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const component = Extension;
