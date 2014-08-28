/* UI Helper Functions
-------------------------------------------------- */

module.exports = function() {

    return function mutePanels(p) {

        elementList = document.querySelectorAll('table.navable');

        switch (p) {
            case "panel_activity":
                elementList[0].classList.remove("unselected");
                elementList[1].classList.remove("unselected");
                elementList[2].classList.remove("unselected");

                elementList[1].classList.add("unselected");
                elementList[2].classList.add("unselected");
                break
            case "panel_favorites":
                elementList[0].classList.remove("unselected");
                elementList[1].classList.remove("unselected");
                elementList[2].classList.remove("unselected");

                elementList[0].classList.add("unselected");
                elementList[2].classList.add("unselected");
                break
            case "panel_community":
                elementList[0].classList.remove("unselected");
                elementList[1].classList.remove("unselected");
                elementList[2].classList.remove("unselected");

                elementList[0].classList.add("unselected");
                elementList[1].classList.add("unselected");
                break
            default:
                if (elementList[0]) {
                    elementList[0].classList.remove("unselected");
                    elementList[1].classList.remove("unselected");
                    elementList[2].classList.remove("unselected");
                }
        }

    }

};