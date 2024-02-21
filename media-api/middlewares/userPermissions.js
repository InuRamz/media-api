exports.permit = (permission) => {
	return (req, res, next) => {
		const userPermissions = req.user._role._permissions.map(p => p.slug);
		if (userPermissions.includes(permission)) {
			next();

		} else {
			res.status(403).send({ message: 'Unauthorized access. ( ' + permission + ' is required)' });
		}
	}
}