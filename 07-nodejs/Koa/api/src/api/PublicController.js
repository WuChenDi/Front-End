class PublicController {
	constructor() {}
	async demo(ctx) {
		ctx.body = {
			msg: "body message",
		};
	}
}

export default new PublicController();
