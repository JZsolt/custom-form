import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formsQuery } from "../queries/forms";
import request from "graphql-request";
import { getDataAttributes } from "../utils/getters";

const Home = () => {
  const [formsState, setFormsState] = useState<any>();

  const { data }: { data: any } = useQuery({
    queryKey: ["forms"],
    queryFn: async () => request("http://localhost:1337/graphql", formsQuery),
  });

  useEffect(() => {
    if (data) {
      const { forms } = data;
      setFormsState(forms.data);
    }
  }, [data]);

  return (
    <div>
      Home
      {formsState &&
        formsState?.map((form: any) => (
          <div
            key={getDataAttributes(form).id}
            style={{ borderBottom: "1px solid" }}
          >
            <p>Form ID:{form?.id}</p>
            <p>Form name: {getDataAttributes(form, "FormName")}</p>
            <p>Form customID: {getDataAttributes(form, "customID")}</p>
            {getDataAttributes(form).Fields.map((field: any) => (
              <>
                {field.label && <label>{field.label}</label>}
                <input
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  className={field.className}
                />
              </>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Home;
