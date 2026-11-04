$(document).ready(function () {
  $("#current-year").text(new Date().getFullYear());

  $("#evaluate-budget").click(function () {
    const budget = $("#monthly-budget").val();
    const accommodation = $("#accommodation").val();
    const materials = $("#materials").val();
    const emergency = $("#emergency").val();
    const savings = $("#savings").val();
    const values = [budget, accommodation, materials, emergency, savings];
    const percentages = [accommodation, materials, emergency, savings].map(Number);
    const error = $("#budget-error");
    const results = $("#budget-results");

    error.prop("hidden", true).text("");
    results.prop("hidden", true);

    if (values.some(function (value) {
      return value === "" || !Number.isFinite(Number(value));
    })) {
      error.text("Please enter a valid number in every field.").prop("hidden", false);
      return;
    }

    if (Number(budget) < 0 || percentages.some(function (percentage) {
      return percentage < 0 || percentage > 100;
    })) {
      error.text("The budget and percentages must be non-negative, and each percentage must be no more than 100%.").prop("hidden", false);
      return;
    }

    const percentageTotal = percentages.reduce(function (total, percentage) {
      return total + percentage;
    }, 0);

    if (Math.abs(percentageTotal - 100) > 0.000001) {
      error.text("Your percentages currently total " + percentageTotal + "%. They must add up to exactly 100%.").prop("hidden", false);
      return;
    }

    const monthlyBudget = Number(budget);
    const formatAmount = function (percentage) {
      return "$" + (monthlyBudget * percentage / 100).toFixed(2);
    };

    $("#accommodation-result").text(formatAmount(percentages[0]));
    $("#materials-result").text(formatAmount(percentages[1]));
    $("#emergency-result").text(formatAmount(percentages[2]));
    $("#savings-result").text(formatAmount(percentages[3]));
    results.prop("hidden", false);
  });

  $(".course-toggle").click(function () {
    const button = $(this);
    const description = button.next(".course-description");
    const isExpanded = button.attr("aria-expanded") === "true";

    description.stop(true, true);

    if (isExpanded) {
      button.text("Show description").attr("aria-expanded", "false");
      description.slideUp(180, function () {
        if (button.attr("aria-expanded") === "false") {
          description.prop("hidden", true);
        }
      });
    } else {
      button.text("Hide description").attr("aria-expanded", "true");
      description.prop("hidden", false).hide().slideDown(180);
    }
  });
});
