const jwt = require('jsonwebtoken');

// function requestNewTokens() {
// 	const accessToken = jwt.sign({}, 'swsh23hjddnns', { expiresIn: '1h' });
// 	const refreshToken = jwt.sign({}, 'dhw782wujnd99ahmmakhanjkajikhiwn2n', { expiresIn: '1h' });
// 	return { accessToken, refreshToken };
// }

function requestUserTokens({ id }) {
	const user = { id };
	const accessToken = jwt.sign(user, 'swsh23hjddnns', { expiresIn: '1h' });
	const refreshToken = jwt.sign(user, 'dhw782wujnd99ahmmakhanjkajikhiwn2n', { expiresIn: '1h' });
	return { accessToken, refreshToken };
}

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	const refreshHeader = req.headers['refresh'];
	const refreshtoken = refreshHeader && refreshHeader.split(' ')[1];

	//console.log(token);
	if (token == null || refreshtoken == null) return res.status(401).json({ error: 'Unauthorized Access' });

	jwt.verify(refreshtoken, 'dhw782wujnd99ahmmakhanjkajikhiwn2n', (error, user) => {
		if (error) return res.status(403).json({ error: 'Unauthorized:Invalid referesh token' });
		jwt.verify(token, 'swsh23hjddnns', (error, user) => {
			if (error) return res.status(403).json({ error: 'Unauthorized:Invalid auth token' });
			req.user = user;
			next();
		});
	});
}

module.exports = { requestUserTokens, authenticateToken };
