

if (typeof vPlanFUP != 'undefined') {
	vCategoryPCC = GetUsrCategoryByType(vPaymentType, vPlanFUP);
} else {
	if (typeof vPaymentType != 'undefined') {
		switch (vPaymentType) {
			case 1:
				vCategoryPCC = 'normal';
				break;
			case 2:
				vCategoryPCC = 'Hibrido';
				break;

		}

	}
	else{
		vCategoryPCC='normal';
	}
}