export interface Note {
	uuid: string,
	title: string,
	content: string,
	created_at: Date,
	updated_at: Date | undefined
}