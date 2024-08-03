import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDataTable } from "@/components/users/table/user-data-table";
import { columns } from "@/components/users/table/user-data-table-columns";
import { db } from "@/core/client/client";
import { language } from "@/resource/language/language";

const UserListPageStyles = {
  CARD: 'border-none shadow-none p-0',
  CARD_CONTENT: 'p-4 h-full',
};

const UserListPage = async () => {
  const data = await db.user.findMany();
  return (
    <section>
      <Card className={UserListPageStyles.CARD}>
        <CardHeader className="px-4">
          <CardTitle>{language.USER_MANAGEMENT}</CardTitle>
          <CardDescription>
           {language.USER_MANAGEMENT_DESC}
          </CardDescription>
        </CardHeader>
        <CardContent className={UserListPageStyles.CARD_CONTENT}>
          <UserDataTable data={data} columns={columns} />
        </CardContent>
      </Card>
    </section>
  );
};

export default UserListPage;
