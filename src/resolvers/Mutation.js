const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
	async createItem(parent, args, ctx, info) {
		// TODO: Check if user is logged in

		const item = await ctx.db.mutation.createItem(
			{
				data: {
					...args
				}
			},
			info
		);
		return item;
	},
	updateItem(parent, args, ctx, info) {
		// take a copy of the updates
		const updates = { ...args };
		// remove the ID from the updates
		delete updates.id;
		// run the update method
		return ctx.db.mutation.updateItem(
			{
				data: updates,
				where: {
					id: args.id
				}
			},
			info
		);
	},
	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };

		// 1. find the item
		const item = await ctx.db.query.item({ where }, `{ id title }`);

		// 2. Check if user owns item or has permission to delete
		// TODO
		// 3. Delete it
		return ctx.db.mutation.deleteItem({ where }, info);
	},
	async signup(parent, args, ctx, info) {
		// convert incoming email to lower case
		args.email = args.email.toLowerCase();
		// hash user password
		const password = await bcrypt.hash(args.password, 10);
		// create user in DB
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password,
					permissions: { set: ['USER'] }
				}
			},
			info
		);
		// create JWT for user
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// set JWT as cookie on the response
		ctx.response.cookie('token', token, {
			// blocks javascript from reading cookies
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
		});
		return user;
	}
};

module.exports = Mutations;
