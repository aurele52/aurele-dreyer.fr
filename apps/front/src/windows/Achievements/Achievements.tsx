import "./Achievements.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../axios";
import List from "../../shared/ui-components/List/List";
import { FaSpinner } from "react-icons/fa";
import { delWindow } from "../../reducers";
import store from "../../store";

interface AchievementsProps {
	targetId?: number;
	winId: number;
}

export function Achievements({ targetId, winId }: AchievementsProps) {
	const {
		data: userId,
		isLoading: userIdLoading,
		error: userIdError,
	} = useQuery<number>({
		queryKey: ["userId"],
		queryFn: async () => {
			if (targetId !== undefined) {
				return targetId;
			}
			try {
				const response = await api.get("/id");
				return response.data;
			} catch (error) {
				store.dispatch(delWindow(winId))
			}
		},
		
	});

	const {
		data: achievements,
		isLoading: achievementsLoading,
		error: achievementsError,
	} = useQuery<
		{
			name: string;
			description: string;
		}[]
	>({
		queryKey: ["achievements", userId],
		queryFn: async () => {
			try {
				const response = await api.get(`/achievements/list/${userId}`);
				return response.data;
			} catch (error) {
				store.dispatch(delWindow(winId))
			}
		},
		enabled: !!userId,
	});

	if (achievementsLoading || userIdLoading) {
		return (
			<div className="Ladder">
				<FaSpinner className="loadingSpinner" />
			</div>
		);
	}

	if (achievementsError) {
		return <div>Error loading users: {achievementsError.message}</div>;
	}

	if (userIdError) {
		return <div>Error loading user: {userIdError.message}</div>;
	}

	return (
		<div className="Achievements">
			<List>
				{achievements?.map((achievement, index) => {
					return (
						<div className="Achievement" key={index}>
							<div>
								<div className="Name">{achievement.name}</div>
								<div className="Description">
									{achievement.description}
								</div>
							</div>
						</div>
					);
				})}
			</List>
		</div>
	);
}

export default Achievements;
