#include<stdio.h>
#define N 10000000
int father[N],num[N];
void initial()
{
    int i;
   for(i=1;i<=N;i++)
    {
        father[i]=i;
        num[i]=1;
    }
}

int find(int x)
{
    if(father[x]!=x)
    father[x]=find(father[x]);
    return father[x];
}
void merge(int a,int b)
{

     int p=find(a);
     int q=find(b);
    if(p!=q)
    {
        father[p]=q;
       num[q]+=num[p];
    }
   // return h[q];
}
int main()
{
    int n,a,b,i,sum,max;
    while(~scanf("%d",&n))
    {
        if(n==0)
        {
            printf("1\n");
             continue;
        }
       max=0;
       initial();
      for(i=0;i<n;i++)
        {
            scanf("%d%d",&a,&b);
            if(a>max)
            max=a;
            if(b>max);
            max=b;
            merge(a,b);
        }
         int Max=0;
          for(i=1;i<=max;i++)
           if(num[i]>Max)
            Max=num[i];
         printf("%d\n",Max);
    }
    return 0;
}
