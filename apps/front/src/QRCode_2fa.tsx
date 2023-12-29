import { useQuery } from "@tanstack/react-query";
import api from "./axios";

function name() {
    //     const QRCode = api.post("/2fa/generate")
    // .then((response) => response.data);
    // console.log(QRCode_2fa);
    return api.post("/2fa/generate")
    .then((response) => response.data);;
}

function QRCode_2fa() {

    const QRCode = useQuery<string>({
        queryKey: ["code"],
        queryFn: async () => {
          return api.post("/2fa/generate");
        },
    // const QRCode = name();
    // return (
    //     <div>
    //         {QRCode}
    //     </div>
});
}


export default QRCode_2fa;