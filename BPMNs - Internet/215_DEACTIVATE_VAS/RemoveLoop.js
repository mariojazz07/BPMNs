vSchCounter++;

if (vSchCounter < vSchTasksToRemove.length) {
	vSchID = vSchTasksToRemove[vSchCounter];
	DoRemove=true;
} else {
	DoRemove = false;
}