import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./axios";
import { AxiosError, AxiosResponse } from "axios";

function name() {
    //     const QRCode = api.post("/2fa/generate")
    // .then((response) => response.data);
    // console.log(QRCode_2fa);
    return api.post("/2fa/generate")
    .then((response) => response.data);;
}

interface ValidationErrorResponse {
    [key: string]: string[];
  }
  
function QRCode_2fa() {
    const queryClient = useQueryClient();

    const { data: user } = useQuery<User>({
        queryKey: ["friendship", userId],
        queryFn: async () => {
          return api.get("/friendship/" + userId).then((response) => response.data);
        },
      });
    
	const { mutateAsync: generateQRCode } = useMutation({
		mutationFn: async (user_id: number) => {
			return api.post("/2fa/generate", user_id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["channels"] });
			queryClient.invalidateQueries({ queryKey: ["chats"] });
		},
	});

    const QRCode = useQuery<string>({
        queryKey: ["code"],
        queryFn: async () => {
          return api.post("/2fa/generate").then(response => response.data);
        },
    })
    console.log(QRCode);
    // const QRCode = name();
    return (
        <div>
            bonjour
        </div>
    )
};


export default QRCode_2fa;