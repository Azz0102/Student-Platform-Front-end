// import { getValidFilters } from "@/lib/data-table"
// import { Skeleton } from "@/components/ui/skeleton"
// import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
// import { DateRangePicker } from "@/components/date-range-picker"
// import { Shell } from "@/components/shell"

// import { FeatureFlagsProvider } from "@/app/_components/feature-flags-provider"
// import { TasksTable } from "@/app/_components/tasks-table"
// import {
//   getList,
//   getTaskPriorityCounts,
//   getTasks,
//   getTaskStatusCounts,
// } from "@/app/_lib/queries"
import { searchParamsCache } from "@/app/_lib/validations";
import AdministrationLayout from "@/components/administration/AdministrationLayout";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";

const i18nNamespaces = ["administration"];

export default async function Page(props) {
	const searchParams = await props.searchParams;
	const id = await props.params.id;

	// if (typeof searchParams.filters === 'string') {
	//   try {
	//     searchParams.filters = JSON.parse(searchParams.filters); // Phân tích chuỗi JSON
	//   } catch (error) {
	//     console.error("Lỗi phân tích JSON:", error);
	//     searchParams.filters = []; // Gán mảng rỗng nếu có lỗi
	//   }
	// }
	const search = searchParamsCache.parse(searchParams);
	const { resources } = await initTranslations(
		props.params.locale,
		i18nNamespaces
	);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={props.params.locale}
			resources={resources}
		>
			<div>
				<AdministrationLayout search={search} id={Number(id)} />
			</div>
		</TranslationsProvider>
	);
}
