export enum UserRole { 
	MEMBER = "MEMBER",
	ADMIN = "ADMIN",
	OWNER = "OWNER",
}

export const userLvl = {
	[UserRole.MEMBER]: 0,
	[UserRole.ADMIN]: 1,
	[UserRole.OWNER]: 2,
}