export interface AccessToken42 {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  created_at: number;
  secret_valid_until: number;
}

export interface UserInfo42 {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  usual_full_name: string;
  usual_first_name: any;
  url: string;
  phone: string;
  displayname: string;
  kind: string;
  image: Image;
  'staff?': boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: any;
  wallet: number;
  anonymize_date: string;
  data_erasure_date: string;
  created_at: string;
  updated_at: string;
  alumnized_at: any;
  'alumni?': boolean;
  'active?': boolean;
  groups: Group[];
  cursus_users: CursusUser[];
  projects_users: ProjectsUser[];
  languages_users: LanguagesUser[];
  achievements: Achievement[];
  titles: Title[];
  titles_users: TitlesUser[];
  partnerships: any[];
  patroned: any[];
  patroning: Patroning[];
  expertises_users: any[];
  roles: any[];
  campus: Campu[];
  campus_users: CampusUser[];
}

export interface Image {
  link: string;
  versions: Versions;
}

export interface Versions {
  large: string;
  medium: string;
  small: string;
  micro: string;
}

export interface Group {
  id: number;
  name: string;
}

export interface CursusUser {
  grade?: string;
  level: number;
  skills: Skill[];
  blackholed_at?: string;
  id: number;
  begin_at: string;
  end_at?: string;
  cursus_id: number;
  has_coalition: boolean;
  created_at: string;
  updated_at: string;
  user: User;
  cursus: Cursus;
}

export interface Skill {
  id: number;
  name: string;
  level: number;
}

export interface User {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  usual_full_name: string;
  usual_first_name: any;
  url: string;
  phone: string;
  displayname: string;
  kind: string;
  image: Image2;
  'staff?': boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: any;
  wallet: number;
  anonymize_date: string;
  data_erasure_date: string;
  created_at: string;
  updated_at: string;
  alumnized_at: any;
  'alumni?': boolean;
  'active?': boolean;
}

export interface Image2 {
  link: string;
  versions: Versions2;
}

export interface Versions2 {
  large: string;
  medium: string;
  small: string;
  micro: string;
}

export interface Cursus {
  id: number;
  created_at: string;
  name: string;
  slug: string;
  kind: string;
}

export interface ProjectsUser {
  id: number;
  occurrence: number;
  final_mark?: number;
  status: string;
  'validated?'?: boolean;
  current_team_id: number;
  project: Project;
  cursus_ids: number[];
  marked_at?: string;
  marked: boolean;
  retriable_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  parent_id: any;
}

export interface LanguagesUser {
  id: number;
  language_id: number;
  user_id: number;
  position: number;
  created_at: string;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  tier: string;
  kind: string;
  visible: boolean;
  image: string;
  nbr_of_success?: number;
  users_url: string;
}

export interface Title {
  id: number;
  name: string;
}

export interface TitlesUser {
  id: number;
  user_id: number;
  title_id: number;
  selected: boolean;
  created_at: string;
  updated_at: string;
}

export interface Patroning {
  id: number;
  user_id: number;
  godfather_id: number;
  ongoing: boolean;
  created_at: string;
  updated_at: string;
}

export interface Campu {
  id: number;
  name: string;
  time_zone: string;
  language: Language;
  users_count: number;
  vogsphere_id: number;
  country: string;
  address: string;
  zip: string;
  city: string;
  website: string;
  facebook: string;
  twitter: string;
  active: boolean;
  public: boolean;
  email_extension: string;
  default_hidden_phone: boolean;
}

export interface Language {
  id: number;
  name: string;
  identifier: string;
  created_at: string;
  updated_at: string;
}

export interface CampusUser {
  id: number;
  user_id: number;
  campus_id: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}
