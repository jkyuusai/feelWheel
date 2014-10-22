getFeelings = function(coreFeeling, degree) {
	if(!coreFeeling && !degree) {
		return;
	}
	var feelings = [];

	_.each(_.keys(feelingSectionMap), function(f) {
		if(matchesDegree(f,degree) && matchesCoreFeeling(f,coreFeeling)) {
			feelings.push(feelingSectionMap[f]);
		}
	});
	return feelings;
};

matchesDegree = function(f, degree) {
	if(!degree) {
		return true;
	}
	return degree.length && feelingSectionMap[f].degree === degree
};

matchesCoreFeeling = function(f, coreFeeling) {
	if(!coreFeeling) {
		return true;
	}
	return coreFeeling.length && feelingSectionMap[f].coreFeeling === coreFeeling
};