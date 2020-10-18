// (function closure() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	Talk.ready.then(function () {
		auth.onAuthStateChanged((user) => {
			if (!user) {
				document.location.replace("/login.html");
			} else {
				db.collection('users').doc(auth.currentUser.uid).get().then((doc) => {
					db.collection('users').doc(urlParams.get('id')).get().then((otherDoc) => {
						let userData = doc.data();
						let otherData = otherDoc.data();

						var me = new Talk.User({
							id: auth.currentUser.uid,
							name: userData.name,
							email: userData.email,
							photoUrl: "https://demo.talkjs.com/img/alice.jpg"
						});
						var other = new Talk.User({
							id: urlParams.get("id"),
							name: otherData.name,
							email: otherData.email,
							photoUrl: "https://demo.talkjs.com/img/sebastian.jpg"
						});
						window.talkSession = new Talk.Session({
							appId: "tPPos2DI",
							me: me
						});

						var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))
						conversation.setParticipant(me);
						conversation.setParticipant(other);

						var inbox = talkSession.createChatbox(conversation);
						inbox.mount(document.getElementById("talkjs-container"));
					});
				});
			}
		});
	});
// })()
