import * as React from "react";
import { ApplicationSet } from "./model/applicationset";
import { ApplicationList } from "./model/application";

export const Extension = async (props: {
  tree: any;
  resource: ApplicationSet;
}) => {
  try {

    // fetch all apps
    const response = await fetch(
      `${window.location.href}/api/v1/applications?fields=metadata.resourceVersion%2Citems.metadata.name%2Citems.metadata.namespace%2Citems.metadata.annotations%2Citems.metadata.labels%2Citems.metadata.creationTimestamp%2Citems.metadata.deletionTimestamp%2Citems.spec%2Citems.operation.sync%2Citems.status.sync.status%2Citems.status.health%2Citems.status.operationState.phase%2Citems.status.operationState.operation.sync%2Citems.status.summary%2Citems.status.resources&selector=&appNamespace=`,
      { credentials: "same-origin" }
    );

    if (response.status != 200) {
      throw new Error(`Response status ${response.status} != 200`);
    }

    const responseJson = (await response.json()) as ApplicationList;

    return (
      <div>
        <ul>
          {responseJson.items
            .filter((item) =>
              // filter the one owned by the ApplicationSet
              item.metadata.ownerReferences?.find(
                (ownerRef) => ownerRef.uid === props.resource.metadata.uid
              )
            )
            .map((item) => {
              <li>
                <a href="{window.location.href}/applications/argocd/{item.metadata.name}">
                  {item.metadata.name}
                </a>
              </li>;
            })}
        </ul>
      </div>
    );
  } catch (error) {
    return <div>ERROR</div>;
  }
};

export const component = Extension;

// Register the component extension in ArgoCD
((window: any) => {
  // apiVersion, Kind, Tab name, icon
  window?.extensionsAPI?.registerResourceExtension(
    component,
    "argoproj.io/v1alpha1",
    "ApplicationSet",
    "ApplicationSet",
    { icon: "fa fa-files" }
  );
})(window);
